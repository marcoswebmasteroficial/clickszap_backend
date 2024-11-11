import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm'
import { Otp } from './Otp' // Importe a entidade Otp

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  email: string

  @Column({ select: false })
  password: string

  @Column()
  name: string

  @Column({ default: false })
  isOnline: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @OneToMany(() => Otp, (otp) => otp.user)
  otps: Otp[] // Adiciona a relação com a entidade Otp
}
