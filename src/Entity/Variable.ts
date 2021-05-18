import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity({
  name: 'variables',
})
export class Variable {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({
    type: 'text',
    name: 'name',
  })
  name: string;

  @Column({
    type: 'text',
    name: 'value',
  })
  value: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    name: 'created_at',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    name: 'updated_at',
  })
  public updatedAt: Date;
}
