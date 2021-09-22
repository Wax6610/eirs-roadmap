import { EntityRepository, Repository } from 'typeorm';

import { SmRequestEntity } from './sm-request.entity';
import { SerialSolutionDto } from './types/serial-solution-dto';


@EntityRepository(SmRequestEntity)
export class SmRequestRepository extends Repository<SmRequestEntity> {
  /* Поиск пары : серийник - решения для поиска нового серийного номера в решении*/
  getSolutionsForNewSerialUpdate(): Promise<SerialSolutionDto[]> {
    return this.createQueryBuilder()
      .select('serial')
      .addSelect('solution')
      .where("serial != ''")
      .andWhere("serial in (select serial from roadmap where new_serial = '')")
      .andWhere('solution_date is not null')
      .getRawMany();
  }
}
