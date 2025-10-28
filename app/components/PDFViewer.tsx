"use client";

import React, { useState } from "react";
import { Worker, Viewer, SpecialZoomLevel } from "@react-pdf-viewer/core";
import { toolbarPlugin } from "@react-pdf-viewer/toolbar";
import { zoomPlugin } from "@react-pdf-viewer/zoom";
import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronUp,
  faChevronDown,
  faMinus,
  faPlus,
  faExpand,
} from "@fortawesome/free-solid-svg-icons";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/toolbar/lib/styles/index.css";

const buttonClass =
  "p-1 rounded transition border border-[#2a2a2a] hover:bg-[#1b1b1b] text-[#eaeaea]";

// ✅ Removes unsupported props before spreading
const fixProps = (props: any) => {
  const { enableShortcuts, ...rest } = props;
  return rest;
};

export default function PDFViewer({ fileUrl }: { fileUrl: string }) {
  const toolbarPluginInstance = toolbarPlugin();
  const zoomPluginInstance = zoomPlugin();
  const pageNavigationPluginInstance = pageNavigationPlugin();

  const { Toolbar } = toolbarPluginInstance;

  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <div
      className={`flex flex-col w-full h-full ${
        isFullScreen ? "fixed inset-0 z-50 bg-[#111]" : ""
      }`}
    >
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
        <div className="flex flex-col h-full">
          {/* Toolbar */}
          <Toolbar>
            {(slots) => {
              const {
                CurrentPageInput,
                GoToNextPage,
                GoToPreviousPage,
                NumberOfPages,
                ZoomIn,
                ZoomOut,
              } = slots;

              return (
                <div
                  className="flex justify-between items-center p-3 border-b"
                  style={{ borderColor: "#2a2a2a", background: "#1b1b1b" }}
                >
                  <div className="flex items-center gap-2">
                    <GoToPreviousPage>
                      {(props) => (
                        <button {...fixProps(props)} className={buttonClass}>
                          <FontAwesomeIcon icon={faChevronUp} />
                        </button>
                      )}
                    </GoToPreviousPage>

                    <CurrentPageInput />
                    <span className="mx-1 text-[#888]">/</span>
                    <NumberOfPages />

                    <GoToNextPage>
                      {(props) => (
                        <button {...fixProps(props)} className={buttonClass}>
                          <FontAwesomeIcon icon={faChevronDown} />
                        </button>
                      )}
                    </GoToNextPage>
                  </div>

                  <div className="flex items-center gap-2">
                    <ZoomOut>
                      {(props) => (
                        <button {...fixProps(props)} className={buttonClass}>
                          <FontAwesomeIcon icon={faMinus} />
                        </button>
                      )}
                    </ZoomOut>

                    <ZoomIn>
                      {(props) => (
                        <button {...fixProps(props)} className={buttonClass}>
                          <FontAwesomeIcon icon={faPlus} />
                        </button>
                      )}
                    </ZoomIn>

                    <button
                      onClick={() => setIsFullScreen(!isFullScreen)}
                      className={buttonClass}
                    >
                      <FontAwesomeIcon icon={faExpand} />
                    </button>
                  </div>
                </div>
              );
            }}
          </Toolbar>

          {/* PDF Content */}
          <div className="flex-grow overflow-auto flex justify-center bg-[#111]">
            <Viewer
              fileUrl={fileUrl}
              plugins={[
                toolbarPluginInstance,
                zoomPluginInstance,
                pageNavigationPluginInstance,
              ]}
              defaultScale={SpecialZoomLevel.PageFit}
            />
          </div>
        </div>
      </Worker>
    </div>
  );
}
