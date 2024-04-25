import * as React from "react";
import "./App.css";

import type Bokeh_ from "@bokeh/bokehjs";
const Bokeh = window.Bokeh;

function makeBokeh() {
    const iid = setInterval(() => {
        if (Bokeh !== undefined) {
            console.log("Bokeh is loaded");
            clearInterval(iid);
            return;
        } else {
            console.log("Bokeh is not loaded");
        }
    }, 1000);
    if (Bokeh === undefined) {
        console.log("Bokeh is not loaded");
        return null;
    }
    // create some data and a ColumnDataSource
    const x = Bokeh.LinAlg.linspace(-0.5, 20.5, 10);
    const y = x.map(function (v) {
        return v * 0.5 + 3.0;
    });
    const source = new Bokeh.ColumnDataSource({ data: { x: x, y: y } });

    // create some ranges for the plot
    const xdr = new Bokeh.Range1d({ start: -0.5, end: 20.5 });
    const ydr = new Bokeh.Range1d({ start: -0.5, end: 20.5 });

    // make the plot
    const plot = new Bokeh.Plot({
        title: "BokehJS Plot",
        x_range: xdr,
        y_range: ydr,
        width: 400,
        height: 400,
        background_fill_color: "#F2F2F7",
    });
    plot.add_tools("pan", "hover");

    // add axes to the plot
    const xaxis = new Bokeh.LinearAxis({ axis_line_color: null });
    const yaxis = new Bokeh.LinearAxis({ axis_line_color: null });
    plot.add_layout(xaxis, "below");
    plot.add_layout(yaxis, "left");

    // add grids to the plot
    const xgrid = new Bokeh.Grid({ ticker: xaxis.ticker, dimension: 0 });
    const ygrid = new Bokeh.Grid({ ticker: yaxis.ticker, dimension: 1 });
    plot.add_layout(xgrid);
    plot.add_layout(ygrid);

    // add a Line glyph
    const line = new Bokeh.Line({
        x: { field: "x" },
        y: { field: "y" },
        line_color: "#666699",
        line_width: 2,
    });
    plot.add_glyph(line, source);
    const doc = new Bokeh.Document();

    doc.add_root(plot);

    const div = document.getElementById("app-plot");
    if (div) {
        Bokeh.embed.add_document_standalone(doc, div);
    }

    return plot;
}

function App() {
    const p = React.useRef<Bokeh_.Plot | null>(null);
    React.useEffect(() => {
        if (p.current === null) {
            p.current = makeBokeh();
        }
    });
    return (
        <div>
            <button
                onClick={() => {
                    if (p.current) {
                        console.log(p.current);
                    }
                }}
            >
                Click Me
            </button>
            <div id="app-plot"></div>
        </div>
    );
}

export default App;
