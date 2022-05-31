import { Injectable } from "@nestjs/common";
import moment from "moment";
import { Report } from "./entities/report.entity";
import { ServicesService } from "../services/services.service";
import { SubTypeService } from "../sub-type/sub-type.service";
import { FireCauseService } from "../fire-cause/fire-cause.service";
import { CODES } from "../utils/Constants";
const _: _.LoDashStatic = require("lodash");

@Injectable()
export class ReportsService {
  constructor(
    private readonly servicesService: ServicesService,
    private readonly subTypeService: SubTypeService,
    private readonly fireCauseService: FireCauseService
  ) {}

  async generate(startDate: number, endDate: number) {
    let services = await this.servicesService.findAllBetween(new Date(startDate), new Date(endDate));
    let subTypes = await this.subTypeService.findAllIncludingDisabled();
    let fireCauses = await this.fireCauseService.findAllIncludingDisabled();

    const report: Report = new Report();
    report.date = new Date();

    let servicesSubTypeIdArray = services.map((service) => service.sub_type._id);
    let subtypesCountMap = _.countBy(servicesSubTypeIdArray);
    let subTypeCountById = Object.entries(subtypesCountMap).map(([id, count]) => ({ id, count }));
    let subTypeCountByName = subTypeCountById.map((row) => ({
      id: row.id,
      name: subTypes.find((subType) => subType.id === row.id).name,
      count: row.count,
    }));
    report.subTypeCount = subTypeCountByName;

    let servicesDamageArray = services.map((service) => service.damage);
    let danmgeCountMap = _.countBy(servicesDamageArray);
    let damageCount = Object.entries(danmgeCountMap).map(([name, count]) => ({ id: undefined, name, count }));
    report.damageCount = damageCount;

    let servicesDamage1044Array = _.flattenDeep(
      services.map((service) => service.quantities1044.map((x) => Array(x.quantity).fill(x.name)))
    );
    let danmge1044CountMap = _.countBy(servicesDamage1044Array);
    let damage1044Count = Object.entries(danmge1044CountMap).map(([name, count]) => ({ id: undefined, name, count }));
    report.quantities1044Count = damage1044Count;

    let possibleCausesByIdArray = services.map((service) => service.possible_cause._id);
    let possibleCausesCountMap = _.countBy(possibleCausesByIdArray);
    let possiblecausesCountById = Object.entries(possibleCausesCountMap).map(([id, count]) => ({ id, count }));
    let possiblecausesCountByName = possiblecausesCountById.map((row) => ({
      id: row.id,
      name: fireCauses.find((fireCause) => fireCause.id === row.id).name,
      count: row.count,
    }));
    report.possibleCausesCount = possiblecausesCountByName;

    /*let resourcesUsed1040Array = _.flattenDeep(services.filter(service => subTypes.find(subType => subType.id === service.sub_type._id)?.code === CODES.FIRE).map(service => service.resources_used.map(x => Array(x.quantity).fill(x.resource))));
    let resourcesUsed1040CountMap = _.countBy(resourcesUsed1040Array);
    let resourcesUsed1040Count = Object.entries(resourcesUsed1040CountMap).map(([name, count]) => ({id: undefined, name, count}));
    report.resourcesUsedCount1040 = resourcesUsed1040Count;

    let resourcesUsed1041Array = _.flattenDeep(services.filter(service => subTypes.find(subType => subType.id === service.sub_type._id)?.code === CODES.ACCIDENT).map(service => service.resources_used.map(x => Array(x.quantity).fill(x.resource))));
    let resourcesUsed1041CountMap = _.countBy(resourcesUsed1041Array);
    let resourcesUsed1041Count = Object.entries(resourcesUsed1041CountMap).map(([name, count]) => ({id: undefined, name, count}));
    report.resourcesUsedCount1041 = resourcesUsed1041Count;*/

    return report;
  }
}