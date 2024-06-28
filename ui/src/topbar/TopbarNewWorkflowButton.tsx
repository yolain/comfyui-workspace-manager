import {Tooltip, Button, IconButton} from "@chakra-ui/react";
import { IconDeviceFloppy, IconCirclePlus } from "@tabler/icons-react";
import { useContext } from "react";
import { WorkspaceContext } from "../WorkspaceContext";
import { TOPBAR_BUTTON_HEIGHT } from "../const";
import { app } from "../utils/comfyapp";
import { workflowsTable } from "../db-tables/WorkspaceDB";

export default function TopbarNewWorkflowButton() {
  const { loadNewWorkflow, setCurFlowIDAndName, curFlowID } =
    useContext(WorkspaceContext);
  const saveNewWorkflow = async () => {
    const graph = JSON.stringify(app.graph.serialize());
    const workflowName = prompt("Enter workflow name", "Untitled");
    if (!workflowName) return;
    const flow = await workflowsTable?.createFlow({
      json: graph,
      name: workflowName,
    });
    flow && setCurFlowIDAndName(flow);
  };
  return (
    <Tooltip label={curFlowID ? "New workflow" : "Save workflow"}>
      <IconButton
        onClick={() => (curFlowID ? loadNewWorkflow() : saveNewWorkflow())}
        icon={curFlowID ? (<IconCirclePlus size={20} color={"white"} />) : (<IconDeviceFloppy size={20} color={"white"} />)}
        size={"xs"}
        paddingY={4}
        aria-label="save workspace"
        variant={"ghost"}
      />
    </Tooltip>
  );
}
