import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { User } from '../models/user.model.js'
import { uploadOnCloudinary } from '../utils/Cloudinary.js'
import { ApiResponse } from '../utils/ApiResponse.js'

// access and reftoken
const generateAccessAndRefereshToken = async(userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false})

        return { accessToken, refreshToken}
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token")
    }
}

const registerUser = asyncHandler( async (req, res) => {
    
    //👉 get user details from frontend
    const {fullName, email, username, password} = req.body
    // console.log("Email: ", email);
    // console.log("Required Body: ",req.body);


    //👉 validation - not empty
    // if(fullName === ""){
    //     throw new ApiError(400, "All fields must be required")
    // }

    if ([email, username, password, fullName].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields must be required")
    }

    //👉 check if user already exists: username, email
    const existedUser = await User.findOne({
        $or: ([{ username }, { email }])
    })

    if(existedUser) {
        throw new ApiError(404, "User with email or username already exists")
    }

    //👉 check for images, check for avatar
    const avatarLocalPath = req.files?.avatar[0]?.path;
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;

    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }

    if(!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }

    //👉 upload them to cloudinary, avatar
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400, "Avatar file is required")
    }

    //👉 create user object - create entry in db
    const user = await User.create({
        fullName,
        avater: avatar.url, //her some change avater to avatar
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username?.toLowerCase()
    })

    //👉 remove password and refresh token field from response
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    
    //👉 check for user creation
    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )

})

const loginUser = asyncHandler( async (req, res) => {
    // req body -> data
    const { email, username, password, } = req.body

    // username or email
    if(!username || !email) {
        throw new ApiError(400, "username or email is required")
    }

    // find the user
    const user = await User.findOne({
        $or: ([{username}, {email}])
    })
    
    if(!user) {
        throw new ApiError(404, "User is not exist")
    }

    // password check
    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials")
    }

    // access and reftoken (access and reftoken upper define)
    const { accessToken, refreshToken} = await generateAccessAndRefereshToken(user._id)

    // send cookies
    const loggedInUser = await User.findOne(user._id).select("-password -refreshToken") 
    const options = {
        httpOnly: true,
        secure: true,   
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new Response(
            200,
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged In Successfully"
        )
    )
})


const logoutUser = asyncHandler( async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined    
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true,   
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out Seccussfully"))
})

export { 
    registerUser, 
    loginUser,
    logoutUser
} 