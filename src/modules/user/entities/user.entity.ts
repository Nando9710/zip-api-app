import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Files } from '../../file/entities/file.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  lastName?: string

  @Column()
  email: string;

  @Column()
  password?: string;

  @Column({ default: null, type: "datetime" })
  created_at?: Date;

  @Column({ default: null, type: "datetime" })
  updated_at?: Date;

  @OneToMany(() => Files, files => files.user)
  files?: Files[];
}