import argparse
import sys
import os
import subprocess
import json

from run_bcc import run_bcc
from run_scc import run_scc
from run_basic_statistics import run_basic_statistics

repo_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
parent_dir = os.path.dirname(repo_dir)

parser = argparse.ArgumentParser(
    prog='graph_statistics',
    description='Program to generate the statisctics of the graph')

parser.add_argument('-j', '--json_file', help='The path to the metadata json file', required=True)
parser.add_argument('-g', '--graph_key', help='The key of the graph in the metadata json file. Runs for all the graphs if not provided')
parser.add_argument('-f', '--graph_folder', help='the directory where the graph files are present. Defaults to "/ssd0/graphs".', default="/ssd0/graphs")
parser.add_argument('-p', '--pasgal_repo_path', help='PASGAL repository is searched in the parent directory of this repo. If it is present somewhere else, provide the path to the PASGAL repo using this parameter', default=parent_dir+"/PASGAL")
parser.add_argument('-gs', '--graph_stats_repo_path', help='graph-statistics repository is searched in the parent directory of this repo. If it is present somewhere else, provide the path to the PASGAL repo using this parameter', default=parent_dir+"/graph-statistics")

args = parser.parse_args(sys.argv[1:])

if not os.path.isdir(args.pasgal_repo_path):
    print("PASGAL repo not found")
    exit()

if not os.path.isdir(args.graph_stats_repo_path):
    print("Graph Statistics repo not found")
    exit()

print("*"*30)
print("Running make on graph statistics")
p = subprocess.Popen(f'cd {args.graph_stats_repo_path}/src/basic_statistics && make', shell=True)
p.wait()

print("*"*30)
print("Running make on BCC")
p = subprocess.Popen(f'cd {args.pasgal_repo_path}/src/BCC && make', shell=True)
p.wait()

print("*"*30)
print("Running make on SCC")
p = subprocess.Popen(f'cd {args.pasgal_repo_path}/src/SCC && make', shell=True)
p.wait()

try:
    with open(args.json_file, 'r') as file:
        graphs = json.load(file)
except:
    print("Unable to read the JSON file")
    exit()

for graph_key in graphs:
    if args.graph_key == None or args.graph_key == graph_key:
        print("*"*30)
        print(f'Running for: {graph_key}')
        graph_metadata = graphs[graph_key]
        graph_path = args.graph_folder + "/" + graph_metadata["path"]

        try:
            basic_stats = run_basic_statistics(args.graph_stats_repo_path, graph_path)
            graph_metadata["vertices_count"] = basic_stats["vertices_count"]
            graph_metadata["edges_count"] = basic_stats["edges_count"]
            graph_metadata["density"] = basic_stats["density"]
            graph_metadata["avg_degree"] = basic_stats["avg_degree"]
        except Exception as e:
            print(e)
            continue

        if graph_metadata["directed"] == False:
            try:
                bcc_count, largest_bcc = run_bcc(args.pasgal_repo_path, graph_path)
                graph_metadata["bcc_count"] = bcc_count
                graph_metadata["largest_bcc"] = largest_bcc
            except Exception as e:
                print(e)
                continue
        else:
            graph_metadata["bcc_count"] = "-"
            graph_metadata["largest_bcc"] = "-"
        
        if graph_metadata["directed"] == True:
            try:
                scc_count, larget_scc = run_scc(args.pasgal_repo_path, graph_path)
                graph_metadata["scc_count"] = scc_count
                graph_metadata["larget_scc"] = larget_scc
            except Exception as e:
                print(e)
                continue
        else:
            graph_metadata["scc_count"] = "-"
            graph_metadata["larget_scc"] = "-"

print("*"*30)        
try:
    with open(args.json_file, "w") as file:
        json.dump(graphs, file, indent=2)
except:
    print(f'Error writing back to the JSON file')

print(f"Done saving into the JSON file")