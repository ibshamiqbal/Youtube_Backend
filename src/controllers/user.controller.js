import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import {uploadToCloudinary} from "../utils/cloudinary.js" 
import ApiResponse from "../utils/ApiResponse.js"

const registerUser = asyncHandler( async (req,res) => {
    //get user detail from frontend
    //validation - not empty
    //check if user already exists
    //check images,avatar
    //upload to cloudinary
    //create user object-in db
    //remove password and refresh token
    //check user creation
    //send response back to frontend
    const {fullName , email , userName , password} = req.body
    console.log("email" , email);

    if([fullName, email , userName , password].some((field)=>
    field.trim() === "")){
        throw new ApiError(400,"All fields are required")
    }

    const existedUser = User.findOne({
        $or: [{username} , {email}]
    })

    if (existedUser) {
        throw new ApiError(400, "User already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath =  req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400 , "Avatar files not found")
    }

    const avatar = await uploadToCloudinary(avatarLocalPath)
    const coverImage = await uploadToCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Avatar upload failed")
    }

    const user = await User.create({
        fullName ,
        email ,
        userName: username.toLowerCase() ,
        password ,
        avatar: avatar.url ,
        coverImage : coverImage?.url || ""
    })

    const createdUser = User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500 , "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(
            200, createdUser, "User registered successfully"
        )
    )


})
export {registerUser}