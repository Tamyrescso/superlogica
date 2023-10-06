import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { AppService } from 'src/app.service';
import { CondosModule } from 'src/condos/condos.module';
import { CondosService } from 'src/condos/condos.service';
import { UnitsModule } from 'src/units/units.module';
import { UnitsService } from 'src/units/units.service';
import { VisitorsLogModule } from 'src/visitors-log/visitors-log.module';
import { VisitorsLogService } from 'src/visitors-log/visitors-log.service';
import { VisitorsModule } from 'src/visitors/visitors.module';
import { VisitorsService } from 'src/visitors/visitors.service';

describe('AppModule', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [
        UnitsModule,
        CondosModule,
        VisitorsModule,
        VisitorsLogModule,
        AppModule,
      ],
    }).compile();
  });

  describe('Testing modules', () => {
    let visitorsLogService: VisitorsLogService;
    let condosService: CondosService;
    let unitsService: UnitsService;
    let visitorsService: VisitorsService;
    let appService: AppService;

    beforeEach(() => {
      unitsService = app.get<UnitsService>(UnitsService);
      condosService = app.get<CondosService>(CondosService);
      visitorsLogService = app.get<VisitorsLogService>(VisitorsLogService);
      visitorsService = app.get<VisitorsService>(VisitorsService);
      appService = app.get<AppService>(AppService);
    });

    it('App should be defined', () => {
      expect(appService).toBeDefined();
    });

    it('Units should be defined', () => {
      expect(unitsService).toBeDefined();
    });

    it('Condos should be defined', () => {
      expect(condosService).toBeDefined();
    });

    it('Visitors should be defined', () => {
      expect(visitorsService).toBeDefined();
    });

    it('Visitors Logs should be defined', () => {
      expect(visitorsLogService).toBeDefined();
    });
  });
});
