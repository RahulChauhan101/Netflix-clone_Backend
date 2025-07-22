const signin = async (req,res) => {
    try{
        const {name, email,password} = req.body;
        if(name || email || password ){
            return res.status(400).json({
                message:"invalid data",
                success:false
            })
        }
        const user = await user.findeone({email});
        if(user){
            return res.status(401).json({
                message:"This Email Is Alrady Used",
                success:false,
            })
        }
        await User.create({
            name,
            email,
            password
        })
        return res.status(201).json({
            message:"Account created successfully."
        })
    } catch(err){
        console.log(err);


    }
}