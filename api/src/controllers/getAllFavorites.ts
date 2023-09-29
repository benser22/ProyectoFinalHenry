const {User, Product} = require('../db_connection')
import { Response , Request } from "express";


const getAllFavorites = async (req: Request, res: Response) =>{
    const {username} = req.query;  
    try {
        const allFavorites = await User.findOne({
            where: {username},
            include: Product
        })
        return res.status(200).json(allFavorites);
    } catch (error) {
        return res.status(500).json(error)
    }
}


module.exports = getAllFavorites;



