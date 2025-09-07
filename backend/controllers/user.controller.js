import  User  from '../models/user.model.js';

export const getUsers = async (req, res, next) => {
    try{
         const users = await User.find();
        
         if(users == null || users.length == 0){
            const error = new Error('Users were not found');
            error.status(404);
            throw error;
         }

         res.status(200).json({
            success: true,
            message: 'Users found',
            data: {
                users
            }
            
    });

    }catch(error){
        next(error);
    }
}

export const getUser = async (req, res, next) => {

    try{
        const userId  = req.params.is;

    if(!userId){
        const error = new Error('User Id is required');
        error.status(404);
        throw error;
    }

    const user = await User.findById(userId).select('-password');

    if(!user){
        const error = new Error(`User with this Id ${userId} was not found`);
        error.status(404);
        throw error;
    }

    res.status(200).json({
        success: true, 
        message: 'User found',
        data: {
            user
        }
    });

    }catch(error){
        next(error)
    }
}

export const deleteUser = async (req, res, next) => {
    try{
        const userId = req.params.id;

        if(!userId){
            const error = new Error('Id is required');
            error.status(404);
            throw error;
        }

        const user = await User.findById(userId);

        if(!user){
            const error = new Error(`User with this Id ${userId} was not found`);
            error.status(404);
            throw error;
        }

       const deletedUser = await User.deleteUser(user);

       if(!deletedUser){
        const error = new Error('Failed to delete user');
        error.status(401);
        throw error;
       }

       res.status(200).json({
        success: true,
        message: 'User deleted successfully'
       });

    }catch(error){
        next(error);
    }
}

export const updateUser = async (req, res, next) => {
    try{

          const userName = req.body;
          const userId = req.params.id;

        if(!userId){
            const error = new Error('Id is required');
            error.status(404);
            throw error;
        }

        const user = await User.findById(userId);

        if(!user){
            const error = new Error(`User with this Id ${userId} was not found`);
            error.status(404);
            throw error;
        }

        if(userName != null){
           user.userName = userName;
           const savedUser = await User.savedUser(user);
           res.status(200).json({
            success: true, 
            message: 'User updated successfully',
            data: {
                savedUser
            }
           });
        }

    }catch(error){
        next(error);
    }
}