import Pool from "../config/db";

export const getUsersService = async ()=>{
      const result = await Pool.query("SELECT * FROM users");
      return result.rows
}

export const getUserByIdService = async (id)=>{
      const result = await Pool.query("SELECT user FROM users WHERE id = $1", [id])
      return result.rows[0]
}

export const createUserService = async (name, email)=>{
      const result = await Pool.query(
            "INSERT INTO users (name, email) VALUE ($1, $2) RETURNING *",
            [name,email]);
      return result.rows[0]
}

export const updateUserService = async (name, email, id)=>{
      const result = await Pool.query(
            "UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *",
            [name,email, id]
      );
      return result.rows[0]
}

export const deleteUserService = async (id)=>{
      const result = await Pool.query("DELETE FROM user WHERE id=$1 RETURNING *",[id]);
      return result.rows
}
