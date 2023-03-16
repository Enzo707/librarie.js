/*
      ClusterViewContainer
    +-----------------------------------------------------+
    |  ClusterLeftPane     ClusterRightPane               |
    | +-----------------+ +-----------------------------+ |
    | |    ClusterIcon  | | LibraryItemContainerXxx     | |
    | |       +-------+ | | +-------------------------+ | |
    | |       |       | | | | ...                     | | |
    | |       |       | | | +-------------------------+ | |
    | |       +-------+ | | +-------------------------+ | |
    | |                 | | | ...                     | | |
    | |                 | | +-------------------------+ | |
    | |                 | | +-------------------------+ | |
    | |                 | | | ...                     | | |
    | |                 | | +-------------------------+ | |
    | +-----------------+ +-----------------------------+ |
    +-----------------------------------------------------+
*/

import * as React from "react";
import { LibraryContainer } from "./LibraryContainer";
import { LibraryItem } from "./LibraryItem";
import { ItemData, TooltipText } from "../LibraryUtilities";
import { Tooltip } from "react-tooltip";
require("react-tooltip/dist/react-tooltip.css");

export interface ClusterViewProps {
  libraryContainer: LibraryContainer;
  icon: any;
  clusterType: string;
  showItemSummary: boolean;
  childItems: ItemData[];
}

export class ClusterView extends React.Component<ClusterViewProps> {
    render() {
      const tooltipContent = TooltipText[this.props.clusterType as keyof typeof TooltipText]
    return (
      <div className={"ClusterViewContainer"}>
        <div className={`ClusterLeftPane ${this.props.clusterType}`}>
          <a id={this.props.clusterType} className={"tooltipWrapper"}>
            <img className={"ClusterIcon"} src={this.props.icon} />
          </a>
          <Tooltip
            anchorSelect={`#${this.props.clusterType}`}
            place="bottom"
            content={tooltipContent}
            className={"customTooltip"}
          />
        </div>
        <div className={"ClusterRightPane"}>{this.getNestedElements()}</div>
      </div>
    );
  }

  getNestedElements() {
    let index = 0;
    return this.props.childItems.map((item: ItemData) => {
      return (
        <LibraryItem
          key={index++}
          libraryContainer={this.props.libraryContainer}
          showItemSummary={this.props.showItemSummary}
          data={item}
        />
      );
    });
  }
}
