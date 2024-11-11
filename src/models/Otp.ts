import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  Unique
} from 'typeorm'
import { User } from './User'

@Entity('otps')
@Unique(['user']) // Adiciona a restrição de unicidade no campo user
export class Otp {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  code: string

  @Column()
  expiresAt: Date

  @ManyToOne(() => User, (user) => user.otps, { onDelete: 'CASCADE' })
  user: User

  @CreateDateColumn()
  createdAt: Date
}
