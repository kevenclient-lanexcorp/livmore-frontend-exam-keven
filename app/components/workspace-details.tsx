import { IWorkspace } from '@/app/interfaces/workspaces'
import { useAppContext } from '@/app/contexts/app'
import { PhoneCall, Email, Web } from '@/app/icons'
import useFormatTime from '@/app/hooks/useFormatTime'

interface Props {
  value: IWorkspace
}

const WorkspaceDetails: React.FC<Props> = ({ value }) => {
  const context = useAppContext()
  const formattedFrom = useFormatTime(value.from)
  const formattedTo = useFormatTime(value.to)

  return (
    <div className="flex gap-2 bg-white rounded-2xl h-fit p-3">
      <div className="flex flex-col gap-4 grow">
        <div className="flex flex-col gap-1.5">
          <span className="font-bold">
            {value.area}
          </span>
          <span className="text-[#9a9a9a] text-sm">
            {value.street}
          </span>
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="font-bold">
            Open hours
          </span>
          <span className="text-sm">
            Mon to Fri {formattedFrom} - {formattedTo}
          </span>
          <span className="text-sm">
            After hours bookings &nbsp;
            <span className="text-[#2f54eb] font-bold cursor-pointer"
              onClick={() => context.setWorkspaceBookingDetails(value)}>
              Request here
            </span>
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="flex items-center gap-4
            text-[#2f54eb] text-sm font-medium">
            <PhoneCall/>
            {value.contact_no}
          </span>
          <span className="flex items-center gap-4
            text-[#2f54eb] text-sm font-medium">
            <Email/>
            {value.email}
          </span>
          <span className="flex items-center gap-4
            text-[#2f54eb] text-sm font-medium">
            <Web/>
            {value.website}
          </span>
        </div>
      </div>
      <div className="h-[244px] w-[155px] bg-[#868e96] rounded-xl"></div>
    </div>
  )
}

export default WorkspaceDetails
