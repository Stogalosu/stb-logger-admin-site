#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/0479b0c3190b4a18cd492170c2be2bf1b554c9739367559245e3be6776191f73/contract';
import endContract from '../../snapshots/0479b0c3190b4a18cd492170c2be2bf1b554c9739367559245e3be6776191f73/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'lines',
        columns: [
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('type', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'route_stop',
        columns: [
          col('fraction', 'float8', { notNull: true, codecRef: { codecId: 'pg/float8@1' } }),
          col('sequence', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('stopId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('variandId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['variandId', 'sequence'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'route_variants',
        columns: [
          col('direction', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('path', 'geometry(Geometry,4326)', {
            notNull: true,
            codecRef: { codecId: 'pg/geometry@1', typeParams: { srid: 4326 } },
          }),
          col('routeId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('scheduleType', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'stops',
        columns: [
          col('description', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('location', 'geometry(Geometry,4326)', {
            notNull: true,
            codecRef: { codecId: 'pg/geometry@1', typeParams: { srid: 4326 } },
          }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('underground', 'bool', { notNull: true, codecRef: { codecId: 'pg/bool@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createIndex({
        schema: 'public',
        table: 'route_stop',
        index: 'route_stop_stopId_idx_8804d4e7',
        columns: ['stopId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'route_stop',
        index: 'route_stop_variandId_idx_e7652df5',
        columns: ['variandId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'route_variants',
        index: 'route_variants_routeId_idx_91ae2fd6',
        columns: ['routeId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'route_stop',
        foreignKey: {
          name: 'route_stop_variandId_fkey',
          columns: ['variandId'],
          references: { schema: 'public', table: 'route_variants', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'route_stop',
        foreignKey: {
          name: 'route_stop_stopId_fkey',
          columns: ['stopId'],
          references: { schema: 'public', table: 'stops', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'route_variants',
        foreignKey: {
          name: 'route_variants_routeId_fkey',
          columns: ['routeId'],
          references: { schema: 'public', table: 'lines', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
