var APP_DATA = {
  scenes: [
    {
      id: "0-01",
      name: "01",
      levels: [
        {
          tileSize: 256,
          size: 256,
          fallbackOnly: true,
        },
        {
          tileSize: 512,
          size: 512,
        },
        {
          tileSize: 512,
          size: 1024,
        },
        {
          tileSize: 512,
          size: 2048,
        },
      ],
      faceSize: 1500,
      initialViewParameters: {
        yaw: 1.1759491709358247,
        pitch: -0.2866713470402438,
        fov: 3.3715802068843215,
      },
      linkHotspots: [],
      infoHotspots: [
        {
          yaw: 1.065701322263694,
          pitch: -0.6023976009030545,
          title: "EXIT",
          icon: "EXIT",
        },
        {
          yaw: 1.305701322263694,
          pitch: -0.6823976009030545,
          title: "옥상출입문 설치여부",
          text: "옥상출입문 설치여부",
          icon: "옥상출입문 설치여부",
        },
        {
          yaw: 0.14968997465142309,
          pitch: -0.44127482506351257,
          icon: "장애요인",
          title: "장애요인",
          text:
            '<span style="font-size: 26px; background-color: rgba(103, 115, 131, 0.8);">지붕형태</span>',
        },
        {
          yaw: 2.0382206548403605,
          pitch: -0.1669278639716829,
          title: "옥상 대피공간",
          icon: "옥상 대피공간",
          text: "옥상 대피공간",
        },
        {
          yaw: 0.7821455398265726,
          pitch: -0.944805671101749,
          title: "유도등 설치여부",
          icon: "유도등 설치여부",
          text: "유도등 설치여부",
        },
      ],
    },
    {
      id: "1-02",
      name: "02",
      levels: [
        {
          tileSize: 256,
          size: 256,
          fallbackOnly: true,
        },
        {
          tileSize: 512,
          size: 512,
        },
        {
          tileSize: 512,
          size: 1024,
        },
        {
          tileSize: 512,
          size: 2048,
        },
      ],
      faceSize: 2000,
      initialViewParameters: {
        yaw: -2.9655872133206316,
        pitch: -0.07459936847899584,
        fov: 1.3419983650294325,
      },
      linkHotspots: [],
      infoHotspots: [
        {
          yaw: 2.7193619780764244,
          pitch: 0.13402959169676976,
          title: "1",
          text: "1",
        },
        {
          yaw: -2.6820273717184655,
          pitch: -0.6588936264667105,
          title: "2",
          text: "2",
        },
        {
          yaw: 3.0679344321669397,
          pitch: -0.15901854397277404,
          title: "3",
          text: "3",
        },
        {
          yaw: -3.0479137331706827,
          pitch: -0.8451081667682239,
          title: "4",
          text: "4",
        },
      ],
    },
    {
      id: "2-03",
      name: "01",
      levels: [
        {
          tileSize: 256,
          size: 256,
          fallbackOnly: true,
        },
        {
          tileSize: 512,
          size: 512,
        },
        {
          tileSize: 512,
          size: 1024,
        },
        {
          tileSize: 512,
          size: 2048,
        },
      ],
      faceSize: 1500,
      initialViewParameters: {
        yaw: 1.1759491709358247,
        pitch: -0.2866713470402438,
        fov: 3.3715802068843215,
      },
      linkHotspots: [],
      infoHotspots: [
        {
          yaw: 1.065701322263694,
          pitch: -0.6023976009030545,
          title: "EXIT",
          icon: "EXIT",
        },
        {
          yaw: 1.305701322263694,
          pitch: -0.6823976009030545,
          title: "옥상출입문 설치여부",
          text: "옥상출입문 설치여부",
          icon: "옥상출입문 설치여부",
          isListner: true,
        },
        {
          yaw: 0.14968997465142309,
          pitch: -0.44127482506351257,
          icon: "장애요인",
          title: "장애요인",
          text: "",
          isListner: true,
        },
        {
          yaw: 2.0382206548403605,
          pitch: -0.1669278639716829,
          title: "옥상 대피공간",
          icon: "옥상 대피공간",
          text: "옥상 대피공간",
          isListner: true,
        },
        {
          yaw: 0.7821455398265726,
          pitch: -0.944805671101749,
          title: "유도등 설치여부",
          icon: "유도등 설치여부",
          text: "유도등 설치여부",
          isListner: false,
        },
      ],
    },
  ],
  name: "firedoor",
  settings: {
    mouseViewMode: "drag",
    autorotateEnabled: false,
    fullscreenButton: false,
    viewControlButtons: false,
  },
};
