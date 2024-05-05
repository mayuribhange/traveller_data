import connection from "../handler/config/db_config";

export const insertCategoryValues = async (values: any) => {
  try {
    let sql = `Insert into categories (categoryName) values (?); `;
    const RESULT = await connection.promise().query(sql, [values]);
    return RESULT;
  } catch (error) {
    console.error(error);
    return {};
  }
};

export const categoryExist = async (values: any) => {
  try {
    let sql = `SELECT COUNT(*) AS totalCount FROM categories WHERE categoryName = '${values}';`;
    const result = await connection.promise().query(sql);
   
    let res: any = result[0];
    if (res[0].totalCount > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error executing query:", error);
    return false;
  }
};

export const fetchCategoriesValues = async () => {
  try {
    let sql = `SELECT * FROM categories;`;
    const result = await connection.promise().query(sql);
    let res: any = result[0];
    return res;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const findCategoriesById = async (categoryId: any) => {
  try {
    let sql = `Select * from categories where categoryId = ?`;
    const result = await connection.promise().query(sql, [categoryId]);
    let res: any = result[0];
    return res;
  } catch (error) {
    console.error(error);
    return [];
  }
};
export const updateCategoriesById = async (
  categoryName: any,
  categoryId: any
) => {
  try {
    let sql = `Update categories set categoryName = ? where categoryId =?`;
    let result = await connection
      .promise()
      .query(sql, [categoryName, categoryId]);
    
    let res: any = result[0];
    return res;
  } catch (error) {
    console.error(error);
    return {};
  }
};

export const deleteCategoriesById = async (categoryId: any) => {
  try {
    let sql = `Delete from categories where categoryId= ?`;
    let result = await connection.promise().query(sql, [categoryId]);
   
    let res: any = result[0];
    return res;
  } catch (error) {
    return {};
  }
};

export const serviceExist = async (values: any) => {
  try {
    let sql = `SELECT COUNT(*) AS totalCount FROM services WHERE serviceName =?;`;
    const result = await connection.promise().query(sql, [values]);
    
    let res: any = result[0];
    if (res[0].totalCount > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const insertServicesValues = async (
  serviceName: any,
  catId: any,
  type: any,
  priceOptions: any
) => {
  try {
    let sql = `Insert into services (serviceName,categoryId, type ) values(?,?,?);`;
    const result = await connection
      .promise()
      .query(sql, [serviceName, catId, type]);
    var res: any = result[0],
      arrayOfIds: any = [];
    if (res.affectedRows > 0) {
      priceOptions = await priceOptions.map(async (prices: any) => {
        let sql = `Insert into service_price_options (duration, type, price, serviceId ) values(?,?,?,?);`;
        const result = await connection
          .promise()
          .query(sql, [prices?.duration, prices?.type,prices?.price, res?.insertId]);
        let servicesPriceOptions: any = result[0];
        
        if (res.affectedRows > 0) {
          arrayOfIds.push(servicesPriceOptions?.insertId);
        }
      });
      await Promise.all(priceOptions);
      
      const jsonArray = JSON.stringify(arrayOfIds);

      let updateSql = `Update services set priceOptions = ? where serviceId= ? `;
      let updateSqlResult = await connection
        .promise()
        .query(updateSql, [jsonArray, res?.insertId]);
    
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const findServicesById = async (serviceId: any, categoryId: any) => {
  try {
    let sql = `Select * from services where serviceId= ? and categoryId= ?`;
    const result = await connection
      .promise()
      .query(sql, [serviceId, categoryId]);
    let res: any = result[0];
    return res;
  } catch (error) {
    return [];
  }
};

export const updateServiceById = async (
  serviceId: any,
  categoryId: any,
  serviceName: any,
  type: any,
  priceOptions: any
) => {
  try {
    let sql = `Update services set serviceName = ?, type= ? where serviceId =?`;
    let result = await connection
      .promise()
      .query(sql, [serviceName, type, serviceId]);

    let flag = 0;
    priceOptions = await priceOptions.map(async (prices: any) => {
      

      let sql = `Update service_price_options set price= ?, duration= ?, type =? where priceOptionsId= ?;`;
      const result = await connection
        .promise()
        .query(sql, [prices?.price, prices?.duration, prices?.type, prices?.priceOptionsId]);
     

      let res: any = result[0];
      if (res.affectedRows > 0) {
        flag = 1;
      } else {
        flag = 0;
      }
    });
    await Promise.all(priceOptions);
   
    let res: any = result[0];
    return res;
  } catch (error) {
    console.error(error);
    return {};
  }
};

export const fetchServicesValues = async (categoryId: any) => {
  try {
    let sql = `SELECT s.*, GROUP_CONCAT(spo.priceOptionsId) AS priceOptionsIds
      FROM services AS s
      LEFT JOIN service_price_options AS spo ON s.serviceId = spo.serviceId
      WHERE s.categoryId = ?
      GROUP BY s.serviceId;`;
    const result = await connection.promise().query(sql, [categoryId]);
    let res: any = result[0],
      obj: any = [];
    await Promise.all(
      res.map(async (data: any) => {
        if (data.priceOptionsIds !== null) {
          data.priceOptionsIds = data.priceOptionsIds.split(",");
          const priceSql = `SELECT * FROM service_price_options WHERE priceOptionsId IN (?)`;
          const [priceData] = await connection
            .promise()
            .query(priceSql, [data.priceOptionsIds]);
          data["priceOptions"] = priceData;
        }
        obj.push(data);
      })
    );

    return obj;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const deleteServiceById = async (serviceId: any, categoryId: any) => {
    try {
      let sql = `Delete from services where serviceId= ? and categoryId= ?`;
      let result = await connection.promise().query(sql, [serviceId,categoryId]);
     
      let res: any = result[0];
      return res;
    } catch (error) {
      console.error(error);
        
      return {};
    }
  };