const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database_connection_uri'); // ใส่ URI การเชื่อมต่อฐานข้อมูลของคุณที่นี่

function generateRandomId() {
  // สร้างตัวเลขสุ่มขนาด 10 หลัก
  return Math.floor(Math.pow(10, 9) + Math.random() * 9 * Math.pow(10, 9));
}

const Comment = sequelize.define('comment', {
  // ระบุ attribute ของตาราง
  comment_id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    defaultValue: generateRandomId // ใช้ function generateRandomId เพื่อสร้างค่าเริ่มต้น
  },
  message: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  datetime_comment: {
    type: DataTypes.STRING(20), // อาจจะเป็น DataTypes.DATE ถ้าคุณต้องการเก็บวันที่จริง
    allowNull: false
  },
  post_games_id: {
    type: DataTypes.STRING(10), // อาจต้องแก้ไขเป็น UUID หาก post_games_id ในตาราง post_games คือ UUID
    references: {
      model: 'post_games', // ชื่อตารางของ post_games
      key: 'post_games_id', // คีย์ที่ถูกอ้างอิง
    },
    allowNull: false
  }
}, {
  // ตัวเลือกเพิ่มเติม
  freezeTableName: true, // ป้องกัน Sequelize จากการเปลี่ยนชื่อตารางให้เป็นพหูพจน์
  timestamps: true // เพิ่ม `createdAt` และ `updatedAt` โดยอัตโนมัติ
});

// สร้างตารางตามโมเดลหากยังไม่มี
sequelize.sync()
  .then(() => console.log('Table `comment` has been created successfully.'))
  .catch(error => console.error('This error occurred', error));
