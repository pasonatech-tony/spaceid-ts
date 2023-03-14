import FileInput from "@web/components/atoms/InputFile"
import Table, { Row } from "@web/components/atoms/Table"
import DropdownBox from "@web/components/molecules/DropdownBox"
import Panel from "@web/components/molecules/Panel"
import PanelTwo from "@web/components/molecules/PanelTwo"
import { Tab, TabWrapper } from "@web/components/molecules/TabWrapper"
import type { Theme } from "@web/theme/common"
import ThemeProvider from "@web/theme/provider"
import type { actHandles } from "@web/types"
import { postMsg } from "@web/utils/common"
import {
  useCallback,
  useEffect,
  useState,
  useMemo,
  useRef,
  useReducer,
} from "react"

const App = () => {
  const isActive = useRef(false)
  const [theme, setTheme] = useState("light")
  const [overriddenTheme, setOverriddenTheme] = useState<Theme>()
  const [url, setUrl] = useState(
    "https://raw.githubusercontent.com/pasonatech-nnguyen/sample-data/master/space-id-data.json"
  )
  const [tags, setTags] = useState([])
  const [data, setData] = useState<unknown[]>([])

  const handleReadFile = (file: File | undefined) => {
    if (file) {
      const reader = new FileReader()
      reader.onload = function (e: ProgressEvent<FileReader>) {
        if (e.target?.result) {
          const text = e.target.result as string
          csvToArray(text)
        }

        // The document.write method will overwrite the entire document, including the closing </body> and </html> tags, causing all elements on the page to be removed.
        // document.write(JSON.stringify(array));
      }

      reader.readAsText(file)
      // eslint-disable-next-line no-inner-declarations
      function csvToArray(str: string, delimiter = ",") {
        if (str) {
          const array = str.split("\\\\r\\\\n").map(function (line) {
            return line.split(delimiter)
          })
        }
      }
    }
  }

  const updateReducer = useCallback(
    (num: number): number => (num + 1) % 1_000_000,
    []
  )
  const [, forceUpdate] = useReducer(updateReducer, 0)

  const onClose = useCallback(() => {}, [])

  const handleActiveChange = useCallback(
    (active: boolean) => {
      isActive.current = active
      if (!isActive.current) {
        onClose()
      }
    },
    [onClose]
  )

  const onResize = useCallback((width: number, height: number) => {
    postMsg("resize", [width, height])
  }, [])

  const processUrl = useCallback((url: string) => {
    console.log("handle url from be: ", url)
    setUrl(url)

    //run in re-earth
    const fetchData = async () => {
      try {
        const response = await fetch(url)
        const json = await response.json()
        const dataArray = Array.isArray(json) ? json : Object.entries(json)
        setData(dataArray)
        console.log("data in here: ", dataArray)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  const processTags = useCallback((tags: never[]) => {
    console.log("handle tags from be: ", tags)
    setTags(tags)
  }, [])

  const actHandles: actHandles = useMemo(() => {
    return {
      setTheme: ({
        theme,
        overriddenTheme,
      }: {
        theme: string
        overriddenTheme: Theme
      }) => {
        setTheme(theme)
        setOverriddenTheme(overriddenTheme)
      },
      setUrl: processUrl,
      setTags: processTags,
    }
  }, [processUrl, processTags])

  // console.log("env mode: ", import.meta.env.MODE);

  useEffect(() => {
    ;(globalThis as any).addEventListener("message", (msg: any) => {
      if (msg.source !== (globalThis as any).parent || !msg.data.act) return
      actHandles[msg.data.act as keyof actHandles]?.(msg.data.payload)
    })
    postMsg("getTheme")
    postMsg("getUrl")
    postMsg("getTags")
    // eslint-disable-next-line react-hooks/exhaustive-deps

    //run in local
    if (import.meta.env.MODE === "development") {
      processUrl(
        "https://raw.githubusercontent.com/pasonatech-nnguyen/sample-data/master/space-id-data.json"
      )
    }
  }, [])

  console.log("tags to display", tags)
  console.log("url to display", url)

  return (
    <ThemeProvider theme={theme} overriddenTheme={overriddenTheme}>
      <Panel
        title="spaceid"
        icon="paint"
        onResize={onResize}
        onFoldChange={handleActiveChange}
      >
        <TabWrapper>
          <Tab title="データ" icon="dataset">
            <FileInput
              text="csvデータを追加する"
              icon="plusCircle"
              extendWidth
              parentChannel={handleReadFile}
            />

            {data.map((item, key) => (
              <DropdownBox
                title={
                  Object.values(item as Record<string, any>)[0] +
                  "(" +
                  Object.values(item as Record<string, any>)[1].length +
                  ")"
                }
                folder
                key={`${key} + "abc"`}
                onResize={forceUpdate}
                mainContent={
                  <>
                    {/* value[Object.keys(value)[key]] */}
                    {Object.values(item as Record<string, any>)[1].map(
                      (value: {}, key: number) => (
                        <>
                          <DropdownBox
                            title={Object.keys(value)[key]}
                            folder
                            key={`${key} + "123"`}
                            onResize={forceUpdate}
                            mainContent={
                              <Table>
                                {Object.values(
                                  item as Record<string, any>
                                )[1].map((v: any, k: number) => (
                                  <Row
                                    key={`${k} + "xyz"`}
                                    row1={Object.keys(v)[k]}
                                    row2={
                                      (value as Record<string, any>)[
                                        Object.keys(v as Record<string, any>)[k]
                                      ]
                                    }
                                  ></Row>
                                ))}
                              </Table>
                            }
                          ></DropdownBox>
                        </>
                      )
                    )}
                  </>
                }
              ></DropdownBox>
            ))}
          </Tab>
          <Tab title="スタイル" icon="paint">
            <PanelTwo onResize={forceUpdate} />
          </Tab>
        </TabWrapper>
      </Panel>
    </ThemeProvider>
  )
}

export default App
