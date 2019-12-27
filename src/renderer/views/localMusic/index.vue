<template>
    <div class="local-music">
        <audio autoplay :src="`${audioUrl}?filePath=${curPath}`"></audio>
        <div class="header">本地音乐</div>
        <div class="operation-bar">
            <div class="play-all btn">
                <v-icon>mdi-play-outline</v-icon>播放全部
            </div>
            <div class="add btn">
                <div class="full" @click="addDropListVisible = !addDropListVisible">
                    <v-icon>mdi-plus</v-icon>添加
                </div>
                <div class="list" v-show="addDropListVisible">
                    <div @click="addLocalSong" class="item">
                        手动添加歌曲
                        <input
                            @change="handleChooseSuccess"
                            style="display:none"
                            ref="upload"
                            type="file"
                            multiple
                            accept="audio/*"
                        />
                    </div>
                    <div
                        @click="addScanFileDialogVisible = true;addDropListVisible = false"
                        class="item"
                    >
                        自动扫描监控
                        <input
                            @change="handleChooseDirSuccess"
                            webkitdirectory
                            style="display:none"
                            ref="dir"
                            type="file"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div class="list">
            <div class="songRow tit">
                <div class="songCol name">歌曲</div>
                <div class="songCol">歌手</div>
                <div class="songCol">专辑</div>
                <div class="songCol">大小</div>
            </div>
            <div
                class="songRow"
                v-for="(music, index) in localMusics"
                :key="index"
                @click="playMusic(music.path)"
            >
                <div class="text-cut songCol name">{{music.name}}</div>
                <div class="text-cut songCol">未知歌手</div>
                <div class="text-cut songCol">未知专辑</div>
                <div class="songCol">{{music.size | fileSize}}</div>
            </div>
            <div v-if="!localMusics.length" class="placeholder">暂无本地音乐</div>
        </div>
        <div class="addScanFileDialog" v-show="addScanFileDialogVisible">
            <div class="hd">
                <span>自动扫描添加</span>
                <v-icon @click="addScanFileDialogVisible = false">mdi-close</v-icon>
            </div>
            <div class="cont">
                <div class="tit">
                    <span>勾选自动扫描的文件夹</span>
                    <span @click="autoScanning" class="btn">添加文件夹</span>
                </div>

                <div class="list">
                    <div class="item" v-for="(item, index) in searchFiles" :key="index">
                        <div class="l">
                            <v-checkbox v-model="item.isSearch" :label="item.path" hide-details></v-checkbox>
                        </div>
                        <v-icon>mdi-close</v-icon>
                    </div>
                </div>
                <div class="confirm">
                    <div @click="startScan" class="btn">确认</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import path from 'path'
import { remote } from 'electron'
import fs from 'fs'
import http from 'http'
import url from 'url'
import ffmpeg from 'ffmpeg'
export default {
    name: 'localMusic',
    created() {
        this.server = this.initServer()
        this.audioUrl = location.origin.replace(/:\d{1,5}/, ':1996')
    },
    beforeDestroy() {
        this.searchStatus = false
    },
    data() {
        return {
            searchStatus: true,
            audioUrl: '',
            curPath: '',
            server: {},
            addScanFileDialogVisible: false,
            addDropListVisible: false,
            searchFiles: Object.assign({}, this.sFiles)
        }
    },
    computed: {
        localMusics() {
            return this.$store.state.localMusic.localMusics
        },
        sFiles() {
            return this.$store.state.localMusic.searchFiles
        }
    },
    methods: {
        initServer() {
            const server = http.createServer((req, res) => {
                const { filePath } = url.parse(req.url, true).query
                const stream = fs.createReadStream(filePath)
                filePath && stream.pipe(res)
            })
            server.listen(1996, () => {})

            return server
        },
        getMusicDuration(filePath) {
            const process = new ffmpeg(filePath)
        },
        searchFile(filePath) {
            if (!this.searchStatus) return

            fs.readdir(filePath, 'utf8', (err, dirs) => {
                if (err) {
                } else {
                    dirs.forEach(dir => {
                        if (dir.match(/\..+/)) {
                            const rxp = new RegExp(
                                /(\.mpeg|\.mp3|\.mpeg\-4|\.midi|\.wma)$/
                            )
                            if (rxp.test(dir)) {
                                fs.stat(
                                    path.join(filePath, dir),
                                    (err, stats) => {
                                        if (!err) {
                                            this.$store.dispatch(
                                                'addLocalMusic',
                                                {
                                                    name: dir,
                                                    path: path.join(
                                                        filePath,
                                                        dir
                                                    ),
                                                    size: stats.size
                                                }
                                            )

                                            // const process = new ffmpeg(
                                            //     path.join(filePath, dir)
                                            // )
                                            // process.then(v => {
                                            //     console.log(v.metadata)
                                            // })
                                            // this.searchStatus = false
                                        }
                                    }
                                )
                            }
                        } else {
                            this.searchFile(path.join(filePath, dir))
                        }
                    })
                }
            })
        },
        playMusic(path) {
            this.curPath = path
        },
        addLocalSong() {
            this.addDropListVisible = false
            this.$refs.upload.click()
        },
        handleChooseSuccess() {
            const files = this.$refs.upload.files
            Array.from(files).forEach(file => {
                const { name, path, size } = file
                const hasMusic = this.localMusics.find(item => {
                    return item.path === path
                })
                hasMusic ||
                    this.$store.dispatch('addLocalMusic', {
                        name,
                        path,
                        size
                    })
            })
        },
        autoScanning() {
            this.$refs.dir.click()
        },
        handleChooseDirSuccess() {
            this.$store.dispatch('addFileDir', {
                isSearch: true,
                path: this.$refs.dir.files[0].path
            })
        },
        startScan() {
            const needSearch = this.searchFiles.filter(item => item.isSearch)
            needSearch.forEach(item => {
                this.searchFile(item.path)
            })
            this.addScanFileDialogVisible = false
        }
    },
    filters: {
        fileSize(val) {
            const ONE_KB = 1024
            const ONE_MB = 1024 ** 2

            return (
                (val / (val >= ONE_MB ? ONE_MB : ONE_KB)).toFixed(1) +
                (val >= ONE_MB ? 'M' : 'K')
            )
        }
    }
}
</script>

<style lang="less" scoped>
@paddingX: 20px;
.local-music {
    .full {
        width: 100%;
        height: 100%;
        text-align: center;
    }
    .header {
        padding: 20px @paddingX;
        font-size: 24px;
    }
    .operation-bar {
        display: flex;
        padding: 0 @paddingX;
        margin-bottom: 10px;
        .btn {
            width: 100px;
            padding: 4px 0;
            background-color: var(--theme-color);
            color: white;
            border-radius: 16px;
            margin-right: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 13px;
            cursor: pointer;
        }
        .add {
            position: relative;
            .list {
                position: absolute;
                left: 0;
                bottom: calc(-100% - 50px);
                background-color: #fff;
                border-radius: 4px;
                color: black;
                box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.2);
                padding: 10px 0;
                .item {
                    padding: 6px 10px;
                    width: 160px;
                    cursor: pointer;
                    transition: 0.3s;
                    display: flex;
                    align-items: center;
                    &:hover {
                        background-color: rgba(0, 0, 0, 0.05);
                    }
                }
            }
        }
    }
    .list {
        .songRow {
            display: flex;
            justify-content: space-between;
            padding: 10px @paddingX;
            transition: 0.3s;
            font-size: 14px;
            &.tit {
                font-size: 13px;
                color: #999;
            }
            &:not(.tit) {
                &:hover {
                    background-color: rgba(0, 0, 0, 0.05);
                    cursor: pointer;
                }
            }
        }

        .songCol {
            flex: 1;
            &.name {
                flex: 3;
            }
        }
        .placeholder {
            text-align: center;
            line-height: 100px;
        }
    }

    .addScanFileDialog {
        position: fixed;
        left: 50%;
        top: 50%;
        width: 600px;
        transform: translate(-50%, -50%);
        border-radius: 8px;
        box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.2);
        background-color: #fff;
        .hd {
            padding: 10px @paddingX;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #e6e6e6;
        }
        .cont {
            padding: @paddingX;
            .tit {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                .btn {
                    padding: 4px 10px;
                    font-size: 13px;
                    border: 1px solid #e6e6e6;
                    border-radius: 4px;
                    cursor: pointer;
                }
            }
            .list {
                padding: 10px @paddingX;
                background-color: #fafafa;
                height: 240px;
                .item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 10px 0;
                    border-bottom: 1px solid grey;
                    .l {
                        display: flex;
                        .v-input {
                            margin: 0;
                        }
                    }
                }
            }

            .confirm {
                margin-top: 10px;
                display: flex;
                justify-content: flex-end;
                .btn {
                    background-color: var(--theme-color);
                    color: white;
                    border-radius: 2px;
                    width: 100px;
                    text-align: center;
                    padding: 4px 0;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>