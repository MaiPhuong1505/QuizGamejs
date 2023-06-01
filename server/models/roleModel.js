import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
  roleName: { type: String, require: true },
});

const Role = mongoose.model('Role', roleSchema);

export default Role;
