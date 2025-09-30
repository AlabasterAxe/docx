import { Attributes, XmlComponent } from "@file/xml-components";

// <xsd:complexType name="CT_NumFmt">
//     <xsd:attribute name="val" type="ST_NumberFormat" use="required"/>
//     <xsd:attribute name="format" type="s:ST_String" use="optional"/>
// </xsd:complexType>
class SectionEndnoteNumberFormat extends XmlComponent {
    public constructor(value: string) {
        super("w:numFmt");
        this.root.push(
            new Attributes({
                val: value,
            }),
        );
    }
}

export type ISectionEndnotePropertiesOptions = {
    readonly numberFormat?: string;
};

// <xsd:complexType name="CT_EdnProps">
//     <xsd:sequence>
//         <xsd:element name="pos" type="CT_EdnPos" minOccurs="0"/>
//         <xsd:element name="numFmt" type="CT_NumFmt" minOccurs="0"/>
//         <xsd:group ref="EG_FtnEdnNumProps" minOccurs="0"/>
//     </xsd:sequence>
// </xsd:complexType>
export class SectionEndnoteProperties extends XmlComponent {
    public constructor({ numberFormat = "decimal" }: ISectionEndnotePropertiesOptions = {}) {
        super("w:endnotePr");

        // Add number format
        this.root.push(new SectionEndnoteNumberFormat(numberFormat));
    }
}