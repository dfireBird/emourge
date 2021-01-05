import { Column, Entity, Index, OneToMany } from "typeorm";
import { Emoji } from "./Emoji";

@Index("PK_guild", ["id"], { unique: true })
@Entity("Guild", { schema: "public" })
export class Guild {
    @Column("character varying", { primary: true, name: "id", length: 18 })
    id: string;

    @OneToMany(() => Emoji, (emoji) => emoji.guild)
    emojis: Emoji[];
}
