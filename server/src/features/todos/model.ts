import mongoose, { Schema, Document } from 'mongoose';

export interface ITodos extends Document {
  checked: boolean;
  task: string;
}

const TodosSchema: Schema = new Schema({
  checked: { type: Boolean, required: true },
  task: { type: String, required: true },
});

const Todos = mongoose.model<ITodos>('Todos', TodosSchema);

export { Todos };
