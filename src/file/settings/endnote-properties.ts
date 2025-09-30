import { Attributes, XmlComponent } from "@file/xml-components";

// <xsd:complexType name="CT_NumFmt">
//     <xsd:attribute name="val" type="ST_NumberFormat" use="required"/>
//     <xsd:attribute name="format" type="s:ST_String" use="optional"/>
// </xsd:complexType>
class EndnoteNumberFormat extends XmlComponent {
    public constructor(value: string) {
        super("w:numFmt");
        this.root.push(
            new Attributes({
                val: value,
            }),
        );
    }
}

export type IEndnotePropertiesOptions = {
    readonly numberFormat?: string;
};

// <xsd:complexType name="CT_EdnDocProps">
//     <xsd:complexContent>
//         <xsd:extension base="CT_EdnProps">
//             <xsd:sequence>
//                 <xsd:element name="endnote" type="CT_FtnEdnSepRef" minOccurs="0" maxOccurs="3"/>
//             </xsd:sequence>
//         </xsd:extension>
//     </xsd:complexContent>
// </xsd:complexType>
//
// <xsd:complexType name="CT_EdnProps">
//     <xsd:sequence>
//         <xsd:element name="pos" type="CT_EdnPos" minOccurs="0"/>
//         <xsd:element name="numFmt" type="CT_NumFmt" minOccurs="0"/>
//         <xsd:group ref="EG_FtnEdnNumProps" minOccurs="0"/>
//     </xsd:sequence>
// </xsd:complexType>
export class EndnoteProperties extends XmlComponent {
    public constructor({ numberFormat = "decimal" }: IEndnotePropertiesOptions = {}) {
        super("w:endnotePr");

        // Add number format
        this.root.push(new EndnoteNumberFormat(numberFormat));

        // Add default endnote separators (required for proper endnotes)
        // These correspond to the separator endnotes with id -1 and 0
        this.root.push(
            new EndnoteSeparatorRef(-1),
            new EndnoteSeparatorRef(0)
        );
    }
}

// Footnote separator reference for settings
class FootnoteSeparatorRef extends XmlComponent {
    public constructor(id: number) {
        super("w:footnote");
        this.root.push(
            new Attributes({
                "w:id": id.toString(),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any),
        );
    }
}

// Footnote properties for document-level settings
export class FootnoteProperties extends XmlComponent {
    public constructor() {
        super("w:footnotePr");

        // Add default footnote separators (required for proper footnotes)
        // These correspond to the separator footnotes with id -1 and 0
        this.root.push(
            new FootnoteSeparatorRef(-1),
            new FootnoteSeparatorRef(0)
        );
    }
}

// <xsd:complexType name="CT_FtnEdnSepRef">
//     <xsd:attribute name="id" type="ST_DecimalNumber" use="required"/>
// </xsd:complexType>
class EndnoteSeparatorRef extends XmlComponent {
    public constructor(id: number) {
        super("w:endnote");
        this.root.push(
            new Attributes({
                "w:id": id.toString(),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any),
        );
    }
}