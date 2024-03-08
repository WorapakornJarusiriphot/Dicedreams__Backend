const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database_connection_uri'); // ใส่ URI การเชื่อมต่อฐานข้อมูลของคุณที่นี่

const Account = sequelize.define('account', {
  // ระบุ attribute ของตาราง
  account_id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4, // สร้าง UUID แบบสุ่มเป็นค่าเริ่มต้น
    primaryKey: true // กำหนดเป็น Primary Key
  },
  email: {
    type: DataTypes.STRING(254),
    allowNull: false,
    unique: true // อีเมลไม่ควรซ้ำกันในฐานข้อมูล
  },
  password: {
    type: DataTypes.STRING(64),
    allowNull: false
  },
  username: {
    type: DataTypes.STRING(30),
    allowNull: false
  }
}, {
  // ตัวเลือกเพิ่มเติม
  freezeTableName: true, // ป้องกัน Sequelize จากการเปลี่ยนชื่อตารางให้เป็นพหูพจน์
  timestamps: false // ปิดการใช้งาน timestamps หากคุณไม่ต้องการ `createdAt` และ `updatedAt`
});

// สร้างตารางตามโมเดลหากยังไม่มี
sequelize.sync()
  .then(() => console.log('Table `account` has been created successfully.'))
  .catch(error => console.error('This error occurred', error));

  // module.exports = (sequelize, Sequelize) =>{
  //   const User = sequelize.define("users", {
  //     username: {
  //       type: Sequelize.STRING,
  //     },
  //     email: {
  //       type: Sequelize.STRING,
  //     },
  //     password: {
  //       type: Sequelize.STRING,
  //     },
  //   });
  //   return User;
  // };