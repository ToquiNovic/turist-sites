export interface Site {
    label:    Label;
    nameSite: NameSite;
    website:  string;
    summary:  string;
    location: Array<Location>;
    img:      string;
    country:  string;
    city:     string;
}

interface Location {
    longitud: number;
    latitud:  number;
}

type Label = Array<number>
type NameSite = Array<string>