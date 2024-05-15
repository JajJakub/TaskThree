import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'rtk_blacklist' })
export class BlacklistEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  refresh_token: string;

  @Column({ type: 'timestamp with time zone' })
  expiration_date: Date;
}
