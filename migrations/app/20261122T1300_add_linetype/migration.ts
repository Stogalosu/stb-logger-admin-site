#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/2234e7600955899d757564098645a375cc012992258e9823157fcc6f976f4a3c/contract';
import startContract from '../../snapshots/2234e7600955899d757564098645a375cc012992258e9823157fcc6f976f4a3c/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/8564db97b78b4bb2f082066a6dd55eb3467121b05374c512a0389845cd752ac7/contract';
import endContract from '../../snapshots/8564db97b78b4bb2f082066a6dd55eb3467121b05374c512a0389845cd752ac7/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, sql } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropConstraint({
        schema: 'public',
        table: 'route_stop',
        constraint: 'route_stop_variandId_fkey',
        kind: 'foreignKey',
      }),
      this.dropConstraint({
        schema: 'public',
        table: 'route_variants',
        constraint: 'route_variants_routeId_fkey',
        kind: 'foreignKey',
      }),
      this.dropConstraint({
        schema: 'public',
        table: 'route_stop',
        constraint: 'route_stop_pkey',
        kind: 'primaryKey',
      }),
      this.dropIndex({
        schema: 'public',
        table: 'route_stop',
        index: 'route_stop_variandId_idx_e7652df5',
      }),
      this.dropColumn({ schema: 'public', table: 'route_stop', column: 'variandId' }),
      this.dropIndex({
        schema: 'public',
        table: 'route_variants',
        index: 'route_variants_routeId_idx_91ae2fd6',
      }),
      this.dropColumn({ schema: 'public', table: 'route_variants', column: 'routeId' }),
      this.addRequiredColumnToEmptyTable({
        schema: 'public',
        table: 'route_stop',
        column: 'variantId',
        type: 'int4',
      }),
      this.addRequiredColumnToEmptyTable({
        schema: 'public',
        table: 'route_variants',
        column: 'lineId',
        type: 'int4',
      }),
      this.addPrimaryKey({
        schema: 'public',
        table: 'route_stop',
        constraint: 'route_stop_pkey',
        columns: ['variantId', 'sequence'],
      }),
      this.addCheckConstraint({
        schema: 'public',
        table: 'lines',
        constraint: 'lines_type_check_18a48159',
        expression: sql`"type" IN ('tram', 'trolleybus', 'bus', 'night-bus', 'subway')`,
      }),
      this.createIndex({
        schema: 'public',
        table: 'route_stop',
        index: 'route_stop_variantId_idx_e16bb45d',
        columns: ['variantId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'route_variants',
        index: 'route_variants_lineId_idx_4b6c5a21',
        columns: ['lineId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'route_stop',
        foreignKey: {
          name: 'route_stop_variantId_fkey',
          columns: ['variantId'],
          references: { schema: 'public', table: 'route_variants', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'route_variants',
        foreignKey: {
          name: 'route_variants_lineId_fkey',
          columns: ['lineId'],
          references: { schema: 'public', table: 'lines', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
