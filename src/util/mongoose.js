module.exports= {
    multipleMongoose2Object: function(mongooseArray) {
        return mongooseArray.map(item => item.toObject());
    },
    
    mongoose2object: function(mongoose){
        return mongoose ? mongoose.toObject() : mongoose;
    }
}