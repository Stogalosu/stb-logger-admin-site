#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/0479b0c3190b4a18cd492170c2be2bf1b554c9739367559245e3be6776191f73/contract';
import startContract from '../../snapshots/0479b0c3190b4a18cd492170c2be2bf1b554c9739367559245e3be6776191f73/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/2234e7600955899d757564098645a375cc012992258e9823157fcc6f976f4a3c/contract';
import endContract from '../../snapshots/2234e7600955899d757564098645a375cc012992258e9823157fcc6f976f4a3c/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        schema: 'public',
        table: 'metadata',
        columns: [
          col('key', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('value', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['key'])],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
