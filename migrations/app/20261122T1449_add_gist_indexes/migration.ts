#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/8564db97b78b4bb2f082066a6dd55eb3467121b05374c512a0389845cd752ac7/contract';
import startContract from '../../snapshots/8564db97b78b4bb2f082066a6dd55eb3467121b05374c512a0389845cd752ac7/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/8d873aa7157037f6ad8c45690bf72256324468e49713e52a0ce914822fcb21f4/contract';
import endContract from '../../snapshots/8d873aa7157037f6ad8c45690bf72256324468e49713e52a0ce914822fcb21f4/contract.json' with { type: 'json' };
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createIndex({
        schema: 'public',
        table: 'route_variants',
        index: 'route_variants_path_idx_537d2f74',
        columns: ['path'],
        extras: { type: 'gist' },
      }),
      this.createIndex({
        schema: 'public',
        table: 'stops',
        index: 'stops_location_idx_fb41678c',
        columns: ['location'],
        extras: { type: 'gist' },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
