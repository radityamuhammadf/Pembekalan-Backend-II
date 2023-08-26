const config = require(`${__config_dir}/app.config.json`);
const {debug} = config;
const mysql = new(require(`${__class_dir}/mariadb.class.js`))(config.db);
const Joi =  require('joi');

class _task{
    add(data){

        // Validate data
        const schema = Joi.object({
            item: Joi.string()
        }).options({
            abortEarly: false
        })
        const validation = schema.validate(data)
        if(validation.error){
            const errorDetails = validation.error.details.map((detail)=>{
                detail.message
            })

            return {
                status: false,
                code: 422,
                error: errorDetails.join(', ')
            }
        }

        // Insert data to database
        const sql = {
            query: `INSERT INTO task (items) VALUES (?)`,
            params: [data.item]
        }

        return mysql.query(sql.query, sql.params)
            .then(data=>{
                return {
                    status: true,
                    data
                }
            })
            .catch(error =>{
                if (debug){
                    console.error('add task Error: ', error)
                }

                return{
                    status: false,
                    error
                }
            })  
    }

    read(){

        // read all data from database
        const sql = {
            query: `SELECT * from task`,
        }

        return mysql.query(sql.query)
            .then(data=>{
                return {
                    status: true,
                    data
                }
            })
            .catch(error =>{
                if (debug){
                    console.error('add task Error: ', error)
                }

                return{
                    status: false,
                    error
                }
            })  
    }

    update(data) {
        // Validate data
        const schema = Joi.object({
            id: Joi.number().integer().required(), // Add validation for 'id'
            item: Joi.string().required()
        }).options({
            abortEarly: false
        });
    
        const validation = schema.validate(data);
    
        if (validation.error) {
            const errorDetails = validation.error.details.map((detail) => {
                return detail.message; // Return the error message
            });
    
            return {
                status: false,
                code: 422,
                error: errorDetails.join(', ')
            };
        }
    
        // Update data in the database
        const sql = {
            query: `UPDATE task SET items = ? WHERE id = ?`, // Modify the query for update
            params: [data.item, data.id] // Use 'item' and 'id' from the data object
        };
    
        return mysql
            .query(sql.query, sql.params)
            .then(() => {
                return {
                    status: true,
                    data: "Task updated successfully"
                };
            })
            .catch((error) => {
                if (debug) {
                    console.error('update task Error: ', error);
                }
    
                return {
                    status: false,
                    error
                };
            });
    }
    
    delete(data) {
        // Validate data
        const schema = Joi.object({
            id: Joi.number().integer().required(), // Add validation for 'id'
            item: Joi.string().required()
        }).options({
            abortEarly: false
        });
    
        const validation = schema.validate(data);
    
        if (validation.error) {
            const errorDetails = validation.error.details.map((detail) => {
                return detail.message; // Return the error message
            });
    
            return {
                status: false,
                code: 422,
                error: errorDetails.join(', ')
            };
        }
    
        // Update data in the database
        const sql = {
            query: `DELETE FROM task WHERE id = ?`, // delete on requested id
            params: [data.id] // Using 'id' from the data object as query parameter
        };
    
        return mysql
            .query(sql.query, sql.params)
            .then(() => {
                return {
                    status: true,
                };
            })
            .catch((error) => {
                if (debug) {
                    console.error('Delete Task Error: ', error);
                }
    
                return {
                    status: false,
                    error
                };
            });
    }
}

module.exports = new _task();
