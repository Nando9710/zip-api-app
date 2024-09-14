import { User } from 'src/modules/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Files {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: null, type: "datetime" })
  created_at?: Date;

  @Column({ default: null, type: "datetime" })
  updated_at?: Date;

  @ManyToOne(() => User, user => user.files)
  @JoinColumn()
  user?: User;
}