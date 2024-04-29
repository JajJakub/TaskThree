import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PostEntity } from '../../posts/entities/post.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: false })
  password: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => PostEntity, (post) => post.author)
  posts: PostEntity[];
}
