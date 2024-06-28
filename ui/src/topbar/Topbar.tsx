import { Button, HStack, IconButton, Tooltip } from "@chakra-ui/react";
import Draggable from "../components/Draggable";
import {
  IconDeviceFloppy,
  IconFolder,
  IconGripVertical,
  IconPhoto,
  IconTriangleInvertedFilled,
  IconLock,
} from "@tabler/icons-react";
import DropdownTitle from "../components/DropdownTitle";
import {
  Suspense,
  lazy,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import EditFlowName from "../components/EditFlowName";
import { WorkspaceContext } from "../WorkspaceContext";
import { PanelPosition } from "../types/dbTypes";
import "./Topbar.css";
import VersionNameTopbar from "./VersionNameTopbar";
import { userSettingsTable, workflowsTable } from "../db-tables/WorkspaceDB";
import { TOPBAR_BUTTON_HEIGHT } from "../const";
import TopbarNewWorkflowButton from "./TopbarNewWorkflowButton.tsx";
const AppIsDirtyEventListener = lazy(() => import("./AppIsDirtyEventListener"));
const ModelManagerTopbar = lazy(
  () => import("../model-manager/topbar/ModelManagerTopbar"),
);
const SpotlightSearch = lazy(() => import("../components/SpotlightSearch"));

interface Props {
  curFlowName: string | null;
  setCurFlowName: (newName: string) => void;
}
export function Topbar({ curFlowName, setCurFlowName }: Props) {
  const { isDirty, saveCurWorkflow, setRoute, curFlowID, route } =
    useContext(WorkspaceContext);
  const [positionStyle, setPositionStyle] = useState<PanelPosition>();
  const updatePanelPosition: (
    position?: PanelPosition,
    needUpdateDB?: boolean,
  ) => void = useCallback(
    (position?: PanelPosition, needUpdateDB: boolean = false) => {
      const { top: curTop = 0, left: curLeft = 0 } = positionStyle || {};
      let { top = 0, left = 0 } = position ?? {};
      top += curTop;
      left += curLeft;
      const clientWidth = document.documentElement.clientWidth;
      const clientHeight = document.documentElement.clientHeight;
      const panelElement = document.getElementById("workspaceManagerPanel");
      const offsetWidth = panelElement?.offsetWidth || 392;

      if (top + 36 > clientHeight) top = clientHeight - 36;
      if (left + offsetWidth >= clientWidth) left = clientWidth - offsetWidth;

      setPositionStyle({ top: Math.max(0, top), left: Math.max(0, left) });

      needUpdateDB &&
        userSettingsTable?.upsert({
          topBarStyle: { top, left },
        });
    },
    [positionStyle],
  );
  useEffect(() => {
    userSettingsTable?.getSetting("topBarStyle").then((res) => {
      updatePanelPosition(res, false);
    });
  }, []);
  if (!positionStyle) {
    return null;
  }
  return (
    <Draggable
      onDragEnd={(position: { x: number; y: number }) => {
        updatePanelPosition({ top: position.y, left: position.x }, true);
      }}
      dragIconId="dragPanelIcon"
    >
      <HStack
        style={{
          padding: 2,
          position: "fixed",
          ...positionStyle,
        }}
        justifyContent={"space-between"}
        alignItems={"center"}
        gap={2}
        draggable={false}
        id="workspaceManagerPanel"
        className="workspaceManagerPanel"
      >
        <Button
          size={"sm"}
          aria-label="workspace folder"
          height={TOPBAR_BUTTON_HEIGHT + "px"}
          // backgroundColor={colorMode === "dark" ? "#333547" : undefined}
          onClick={() => setRoute("recentFlows")}
          px={2}
        >
          <HStack gap={1}>
            <IconFolder size={18} />
            <IconTriangleInvertedFilled size={8} />
          </HStack>
        </Button>
        <EditFlowName
          isDirty={isDirty}
          displayName={curFlowName ?? ""}
          updateFlowName={(newName) => {
            setCurFlowName(newName);
            requestAnimationFrame(() => {
              updatePanelPosition();
            });
          }}
        />
        <HStack gap={"0px"}>
          {workflowsTable?.curWorkflow?.saveLock && (
            <IconLock color="#FFF" size={16} />
          )}
          {curFlowID && isDirty ? (
            <HStack gap={"0px"}>
              <Tooltip label="Save workflow">
                <IconButton
                  onClick={() => saveCurWorkflow()}
                  icon={<IconDeviceFloppy size={20} color="white" />}
                  size={"xs"}
                  paddingY={4}
                  aria-label="save workspace"
                  variant={"ghost"}
                />
              </Tooltip>
            </HStack>
          ) : (
            <div style={{ width: 1 }} />
          )}
          <TopbarNewWorkflowButton />
        </HStack>
        {curFlowID && (
          <HStack gap={"2px"}>
            <Tooltip label="Open gallery">
              <IconButton
                onClick={() => setRoute("gallery")}
                icon={<IconPhoto size={18} color="white" />}
                size={"sm"}
                aria-label="open gallery"
                variant={"ghost"}
              />
            </Tooltip>
            <ModelManagerTopbar />
            <DropdownTitle />
          </HStack>
        )}
        <VersionNameTopbar />
        <AppIsDirtyEventListener />
        <IconGripVertical
          id="dragPanelIcon"
          className="dragPanelIcon"
          cursor="move"
          size={15}
          color="#FFF"
        />
        {route === "spotlightSearch" && <SpotlightSearch />}
      </HStack>
    </Draggable>
  );
}
