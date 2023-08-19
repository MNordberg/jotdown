import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 300 })
  text: string;

  @Column()
  date: Date;

  @ManyToOne(() => User, (user) => user.notes, { eager: true })
  user: User;
}
