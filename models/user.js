const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database_connection_uri'); // ใส่ URI การเชื่อมต่อฐานข้อมูลของคุณที่นี่

const User = sequelize.define('user', {
  // ระบุ attribute ของตาราง
  users_id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4, // สร้าง UUID แบบสุ่มเป็นค่าเริ่มต้น
    primaryKey: true // กำหนดเป็น Primary Key
  },
  first_name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  birthday: {
    type: DataTypes.DATEONLY, // ใช้ DATEONLY สำหรับวันที่โดยไม่มีเวลา
    allowNull: true // อนุญาตให้เป็น null ได้หากวันเกิดไม่จำเป็น
  },
  phone_number: {
    type: DataTypes.STRING(20),
    allowNull: true // อนุญาตให้เป็น null ได้หากเบอร์โทรศัพท์ไม่จำเป็น
  },
  gender: {
    type: DataTypes.STRING(10),
    allowNull: true // อนุญาตให้เป็น null ได้หากเพศไม่จำเป็น
  },
  user_image: {
    type: DataTypes.STRING(255), // ใช้สำหรับเก็บ URL หรือเส้นทางของรูปภาพ
    allowNull: true // อนุญาตให้เป็น null ได้หากรูปผู้ใช้ไม่จำเป็น
  },
  account_id: {
    type: DataTypes.UUID,
    references: {
      model: 'accounts', // ชื่อตารางของ account
      key: 'account_id', // คีย์ที่ถูกอ้างอิง
    },
    allowNull: false
  }
}, {
  // ตัวเลือกเพิ่มเติม
  freezeTableName: true, // ป้องกัน Sequelize จากการเปลี่ยนชื่อตารางให้เป็นพหูพจน์
  timestamps: true // หากต้องการเพิ่ม `createdAt` และ `updatedAt`
});

// สร้างตารางตามโมเดลหากยังไม่มี
sequelize.sync()
  .then(() => console.log('Table `user` has been created successfully.'))
  .catch(error => console.error('This error occurred', error));
