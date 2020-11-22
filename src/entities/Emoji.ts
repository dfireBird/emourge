import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Guild } from "./Guild";

@Index("PK_emoji", ["guildId", "id"], { unique: true })
@Index("fkIdx_13", ["guildId"], {})
@Entity("Emoji", { schema: "public" })
export class Emoji {
  @Column("character varying", { primary: true, name: "id", length: 18 })
  id: string;

  @Column("character varying", { primary: true, name: "guild_id", length: 18 })
  guildId: string;

  @Column("character varying", { name: "name", length: 32 })
  name: string;

  @Column("boolean", { name: "animated" })
  animated: boolean;

  @Column("integer", { name: "frequency" })
  frequency: number;

  @ManyToOne(() => Guild, (guild) => guild.emojis)
  @JoinColumn([{ name: "guild_id", referencedColumnName: "id" }])
  guild: Guild;
}
