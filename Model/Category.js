
const CategorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        index:true,
    },
}
)