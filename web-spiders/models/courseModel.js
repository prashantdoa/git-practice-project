const { model, Schema } = require("mongoose")

const CourseSchema = new Schema({
    course_name: {
        type: String,
        // required: [true, "course name is required"]
    },
    course_id: {
        type: String,
        // required: [true, "course id is required"]
    },
    course_language: {
        type: String,
        // required: [true, "course language is required"]
    },
    course_trainer: {
        type: String,
        // required: [true, "course trainer is required"]
    },
    course_duration: {
        type: String,
        // required: [true, "course duration is required"]
    },
    course_category: {
        type: [String],
        enum: [
            "web development",
            "java development",
            "python development",
            "fullstack development",
            "bachend development",
            "ui development",
            "automation testing"
        ],
        required: [true, "course category is required"]
    },
    course_date: {
        type: String,
        // required: [true, "course date is required"],
        // default: Date.now(),
    },
    course_image: {
        type: [''],
        // required: [true, "course image is required"],
        // default: "https://www.sdcourses.com/images/default-course-thumbnail.png"
    },
    course_video: {
        type: [''],
    },
    course_branch: {
        type: [String],
        emum: [
            "basavanagudi",
            "rajajinagar",
            "btm layout",
            "old airport",
            "hebbal",
            "JNTU"
        ],
        required: [true, "Branch is required"]
    },
    course_timings: {
        type: String,
        // required: [true, "course Timings is required"],
        // default:Date.now()
    },
    course_subjects: {
        type: [String],
        enum: [
            "java",
            "javascript",
            "python",
            "nodejs",
            "reactjs",
            "angular",
            "expressjs",
            "web services",
            "selenium",
            "manula testing",
            "api testing",
            "cypress",
            "unit testing",
            "nextjs",
            "socket.io",
            "swagger",
            "postman"
        ],   
        required: [true, "course subject is required"]
    },
    course_description: {
        type: String,
        // required: [true, "course Description is required"],
        // minlength: 10,
        // maxlength: 500,
    },
    students:{
        type:[""]
    }
}
    , { timestamps: true });

module.exports = model("courses", CourseSchema)