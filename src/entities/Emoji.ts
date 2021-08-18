import { Column, Entity, Index, ManyToOne } from "typeorm";
import { Guild } from "./Guild";

@Index("PK_emoji", ["id"], { unique: true })
@Entity("Emoji", { schema: "public" })
export class Emoji {
    @Column("character varying", { primary: true, name: "id", length: 18 })
    id: string;

    @Column("character varying", { name: "name", length: 32 })
    name: string;

    @Column("boolean", { name: "animated" })
    animated: boolean;

    @Column("integer", { name: "frequency" })
    frequency: number;

    @ManyToOne(() => Guild, (guild) => guild.emojis)
    guild: Guild;
}
