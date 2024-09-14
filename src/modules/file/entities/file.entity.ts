import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Files {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  author: string;

  @Column({ default: null, type: "datetime" })
  created_at?: Date;

  @Column({ default: null, type: "datetime" })
  updated_at?: Date;
}