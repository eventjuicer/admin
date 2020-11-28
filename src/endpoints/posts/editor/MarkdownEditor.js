
import * as React from "react";
import { useInput } from 'react-admin';
import Box from '@material-ui/core/Box'
import {makeStyles} from '@material-ui/core/styles'

import Editor from "rich-markdown-editor";
import debounce from "lodash/debounce";
import YoutubeEmbed from './YoutubeEmbed'
import theme from './theme'

const useStyles = makeStyles(theme => ({
    root : {
        transition: 'background-color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
        maxWidth: 800,
        minWidth: 500,
        borderColor: "#666",
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4
    }
}))


export const MarkdownEditor = (props) => {

    const {
        input: { name, onChange, onBlur, onFocus, value, ...rest},
        meta: { touched, error},
        isRequired
    } = useInput(props)

    const classes = useStyles();

    const handleChange = debounce(value => {
        const text = value();
        onChange(text)
      }, 250);

    return ( <Box p={4} mb={1} borderBottom={1} className={classes.root}>                           
        <Editor
        id={name}
        defaultValue={value}
        theme={theme}
        onChange={handleChange}
        onSave={options => console.log("Save triggered", options)}
        onCancel={() => console.log("Cancel triggered")}
        onClickLink={(href, event) =>
            console.log("Clicked link: ", href, event)
          }
        onHoverLink={event => {
            console.log("Hovered link: ", event.target.href);
            return false;
        }}
        onClickHashtag={(tag, event) =>
            console.log("Clicked hashtag: ", tag, event)
        }
        onCreateLink={title => {
            // Delay to simulate time taken for remote API request to complete
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                if (title !== "error") {
                  return resolve(
                    `/doc/${encodeURIComponent(title.toLowerCase())}`
                  );
                } else {
                  reject("500 error");
                }
              }, 1500);
            });
        }}
        onShowToast={(message, type) => window.alert(`${type}: ${message}`)}
        onSearchLink={async term => {
            console.log("Searched link: ", term);

            // Delay to simulate time taken for remote API request to complete
            return new Promise(resolve => {
              setTimeout(() => {
                resolve(
                  docSearchResults.filter(result =>
                    result.title.toLowerCase().includes(term.toLowerCase())
                  )
                );
              }, Math.random() * 500);
            });
          }}
          uploadImage={file => {
            console.log("File upload triggered: ", file);

            // Delay to simulate time taken to upload
            return new Promise(resolve => {
              setTimeout(() => resolve("https://picsum.photos/600/600"), 1500);
            });
          }}
          embeds={[
            {
              title: "YouTube",
              keywords: "youtube video tube google",
              icon: () => (
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/75/YouTube_social_white_squircle_%282017%29.svg"
                  width={24}
                  height={24}
                />
              ),
              matcher: url => {
                return url.match(
                  /(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([a-zA-Z0-9_-]{11})$/i
                );
              },
              component: YoutubeEmbed,
            },
          ]}
    />

    </Box> )
}

export default MarkdownEditor