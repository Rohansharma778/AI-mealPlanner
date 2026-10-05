import db from '../config/db.js'
import bcrypt from 'bcryptjs'

class User{
    //create a new user
    static async create({email,password,name}){
        const hashedPassword=await bcrypt.hash(password,10);

        const result = await db.query(
            `INSERT INTO users(email,password_hash,name)
            VALUES($1,$2,$3) 
            RETURNING id,email,name,created_at`,
            [email,hashedPassword,name]
        );
        return result.rows[0];
    }
    //find a user by email
    static async findByEmail(email){
        const result =await db.query(
            'SELECT * FROM users where email=$1',
            [email]
        );
        return result.rows[0];
    };

    //find user by id
    static async findById(id){
        const result = await db.query(
            'SELECT * FROM users WHERE id=$1',
            [id]
        );
        return result.rows[0];
    };
    
    //update user by id 
    static async update(id,updates){
        const {name,email}=updates;
        const result=await db.query(
            `UPDATE users
            SET name=COALESCE($1,name),
                email=COALESCE($2,email)
            WHERE id=$3
            RETURNING id,email,name,updated_at`,
            [name,email,id]
        );
        return result.rows[0];
    }
    
    //update password
    static async updatePassword(id,newPassword){
        const hashedPassword=await bcrypt.hash(newPassword,10);
        await db.query(
            'UPDATE users SET password_hash=$1 WHERE id=$2',
            [hashedPassword,id]
        );
    }
    
    // verify password 
    static async verifyPassword(plainPassword,hashedPassword){
        return bcrypt.compare(plainPassword,hashedPassword);
    }

    //delete user
    static async delete_User(id){
        await db.query('DELETE FROM users WHERE id=$1',[id]);
    }
}

export default User;