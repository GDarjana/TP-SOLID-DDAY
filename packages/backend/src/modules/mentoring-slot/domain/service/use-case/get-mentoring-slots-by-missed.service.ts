import MentoringSlot from '@src/modules/mentoring-slot/domain/model/entity/mentoring-slot.entity';
import { MentoringSlotRepositoryInterface } from '@src/modules/mentoring-slot/domain/port/db/mentoring-slot.repository.interface';
import MentoringSlotRepository from '@src/modules/mentoring-slot/infrastructure/db/repository/mentoring-slot.repository';

export class GetMentoringSlotsByMissedService {
  constructor(private readonly mentoringSlotRepository: MentoringSlotRepositoryInterface) {}

  async getMentoringSlotsByMissed(isUserAuthenticated: boolean): Promise<MentoringSlot[]> {
    if (!isUserAuthenticated) {
      throw new Error('User is not authenticated');
    }

    const mentoringSlots = await this.mentoringSlotRepository.findMentoringSlotsByMissed();
    return mentoringSlots;
  }
}
