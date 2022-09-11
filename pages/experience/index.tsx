import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import DeveloperIcon from '@mui/icons-material/DeveloperMode';
import SystemIcon from '@mui/icons-material/SystemSecurityUpdateWarning';
import DesktopIcon from '@mui/icons-material/DesktopWindows';
import WebIcon from '@mui/icons-material/WebOutlined';
import ComputerIcon from '@mui/icons-material/SecurityRounded';
import StartIcon from '@mui/icons-material/StartOutlined';
import EducationIcon from '@mui/icons-material/BookOnlineOutlined';
import ArmyIcon from '@mui/icons-material/WarningOutlined';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

function Experience() {
  return (
    <Box>
      <h1 className="text-3xl text-center font-bold"> My professional experience</h1>
      <Timeline position="alternate" className='flex flex-col mx-auto' style={{minWidth: '390px'}}>
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ fontStyle: 'bold', bgcolor: 'rgb(59 130 246 / 0.5)' }}
            align="right"
            variant="body1"
            color="text.secondary"
          >
            1995, July. Informatic Engineering Degree (106/110 Modena, Italy)
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="primary" variant="outlined">
              <EducationIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography variant="h6" component="span">
              Education
            </Typography>
            <Typography>Thesis: A method to translate Easier Schema in PLC code</Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ fontStyle: 'bold', bgcolor: 'rgb(59 130 246 / 0.5)' }}
            align="left"
            variant="body1"
            color="text.secondary"
          >
            1995, November. Engineering profession enabling (Modena, Italy)
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="primary" variant="outlined">
              <ArmyIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography variant="h6" component="span">
              Engineer professionist
            </Typography>
            <Typography>Exam taken during military service</Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ fontStyle: 'bold', bgcolor: 'rgb(59 130 246 / 0.5)' }}
            align="right"
            variant="body1"
            color="text.secondary"
          >
            1996 Delta Informatica (Modena, Italy)
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="primary" variant="outlined">
              <SystemIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography variant="h6" component="span">
              Lan manager
            </Typography>
            <Typography>System administration</Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ fontStyle: 'bold', bgcolor: 'rgb(59 130 246 / 0.5)' }}
            align="left"
            variant="body1"
            color="text.secondary"
          >
            2000 Enne+1 (Modena, Italy)
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="primary" variant="outlined">
              <ComputerIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography variant="h6" component="span">
              Visual basic 6 developer
            </Typography>
            <Typography>My target is to develop software, not to administer tecnology, so I started my route</Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ fontStyle: 'bold', bgcolor: 'rgb(59 130 246 / 0.5)' }}
            align="right"
            variant="body1"
            color="text.secondary"
          >
            2001 CastGroup (Modena, Italy)
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="primary" variant="outlined">
              <DeveloperIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography variant="h6" component="span">
              Visual basic 6 and .Net Developer
            </Typography>
            <Typography>Experience in publishing economy and printed circuits production</Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ fontStyle: 'bold', bgcolor: 'rgb(59 130 246 / 0.5)' }}
            align="left"
            variant="body1"
            color="text.secondary"
          >
            2014 Code Guru (Carpi, Italy)
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="primary" variant="outlined">
              <LaptopMacIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography variant="h6" component="span">
              .Net web engineer
            </Typography>
            <Typography>Startup experience</Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ fontStyle: 'bold', bgcolor: 'rgb(59 130 246 / 0.5)' }}
            align="right"
            variant="body1"
            color="text.secondary"
          >
            2015 IG Consulting (Modena, Italy)
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="primary" variant="outlined">
              <DesktopIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography variant="h6" component="span">
              .Net web and winform developer
            </Typography>
            <Typography>Web services and applications for health sector</Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ fontStyle: 'bold', bgcolor: 'rgb(59 130 246 / 0.5)' }}
            align="left"
            variant="body1"
            color="text.secondary"
          >
            2020 Sixtema (Modena, Italy)
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="primary" variant="outlined">
              <WebIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography variant="h6" component="span">
            .Net 6 and React developer
            </Typography>
            <Typography>Web application for Digital signature and enterprise documental</Typography>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </Box>
  );
}

export default Experience;